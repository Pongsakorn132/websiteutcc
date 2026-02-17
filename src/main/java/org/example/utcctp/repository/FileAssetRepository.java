package org.example.utcctp.repository;

import org.example.utcctp.model.FileAsset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FileAssetRepository extends JpaRepository<FileAsset, UUID> {
}
