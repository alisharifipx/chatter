package au.com.chatter.service;

import au.com.chatter.controller.dto.ChatDto;
import au.com.chatter.controller.dto.ChatSummaryDto;
import au.com.chatter.persistence.entity.ChatEntity;
import au.com.chatter.persistence.repository.ChatRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final SecurityService securityService;

    public List<ChatSummaryDto> getCurrentUserChats() {
        long currentUserId = securityService.getCurrentUser().id();
        List<ChatEntity> chatEntities = chatRepository.findAllChatsByUserId(currentUserId);

        return chatEntities.stream().map(ChatSummaryDto::fromEntity).toList();
    }

    public ChatDto getChat(long id) {
        ChatEntity chatEntity = chatRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException(String.format("No chat with id '%s' found", id)));

        return ChatDto.fromEntity(chatEntity);
    }
}
