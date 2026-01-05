package au.com.chatter.controller;

import au.com.chatter.controller.dto.ChatDto;
import au.com.chatter.controller.dto.ChatSummaryDto;
import au.com.chatter.service.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST API controller for Chats.
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<ChatDto> getChat(@PathVariable long chatId) {
        ChatDto response = chatService.getChat(chatId);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/chats")
    public ResponseEntity<List<ChatSummaryDto>> getChats() {
        List<ChatSummaryDto> response = chatService.getCurrentUserChats();

        return ResponseEntity.ok(response);
    }
}
