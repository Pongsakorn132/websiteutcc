package org.example.utcctp.api;

import org.example.utcctp.ai.AiService;
import org.example.utcctp.api.dto.AiChatRequest;
import org.example.utcctp.api.dto.AiDraftRequest;
import org.example.utcctp.api.dto.AiRecommendRequest;
import org.example.utcctp.api.dto.AiResponse;
import org.example.utcctp.api.dto.AiSummaryRequest;
import org.example.utcctp.user.CurrentUserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ai")
public class AiController {
    private final AiService aiService;
    private final CurrentUserService currentUserService;

    public AiController(AiService aiService, CurrentUserService currentUserService) {
        this.aiService = aiService;
        this.currentUserService = currentUserService;
    }

    @PostMapping("/summary")
    public AiResponse summarize(@RequestBody AiSummaryRequest request) {
        return aiService.summarize(request, currentUserService.requireUser());
    }

    @PostMapping("/recommend")
    public AiResponse recommend(@RequestBody AiRecommendRequest request) {
        return aiService.recommend(request, currentUserService.requireUser());
    }

    @PostMapping("/draft")
    public AiResponse draft(@RequestBody AiDraftRequest request) {
        return aiService.draft(request, currentUserService.requireUser());
    }

    @PostMapping("/chat")
    public AiResponse chat(@RequestBody AiChatRequest request) {
        return aiService.chat(request, currentUserService.requireUser());
    }
}
