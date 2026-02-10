package org.example.utcctp.storage;

import org.example.utcctp.model.FileAsset;
import org.example.utcctp.model.User;
import org.example.utcctp.repository.FileAssetRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {
    private final Path rootPath;
    private final FileAssetRepository fileAssetRepository;

    public FileService(@Value("${app.storage.root}") String rootDir, FileAssetRepository fileAssetRepository) {
        this.rootPath = Paths.get(rootDir);
        this.fileAssetRepository = fileAssetRepository;
        try {
            Files.createDirectories(rootPath);
        } catch (IOException ex) {
            throw new IllegalStateException("Failed to initialize storage", ex);
        }
    }

    public FileAsset store(MultipartFile file, User user) {
        String originalName = StringUtils.cleanPath(file.getOriginalFilename());
        String storedName = UUID.randomUUID() + "-" + originalName;
        Path destination = rootPath.resolve(storedName);
        try {
            Files.copy(file.getInputStream(), destination);
        } catch (IOException ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store file");
        }
        FileAsset asset = new FileAsset();
        asset.setOriginalName(originalName);
        asset.setStoredName(storedName);
        asset.setContentType(file.getContentType());
        asset.setSizeBytes(file.getSize());
        asset.setStoragePath(destination.toString());
        asset.setUploadedBy(user);
        return fileAssetRepository.save(asset);
    }

    public Resource load(UUID id) {
        FileAsset asset = fileAssetRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found"));
        Path path = Paths.get(asset.getStoragePath());
        if (!Files.exists(path)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "File not found");
        }
        return new FileSystemResource(path);
    }
}
