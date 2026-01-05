package au.com.chatter.controller.dto;

import au.com.chatter.persistence.entity.ChatEntity;

import java.util.List;

public record ChatDto(long id, String name, List<ChatParticipantDto> participants, List<MessageDto> messages) {

    public static ChatDto fromEntity(ChatEntity entity) {
        return new ChatDto(
            entity.getId(),
            entity.getName(),
            entity.getParticipants().stream().map(ChatParticipantDto::fromEntity).toList(),
            entity.getMessages().stream().map(MessageDto::fromEntity).toList()
        );
    }
}
