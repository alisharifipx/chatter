package au.com.chatter.controller.dto;

import au.com.chatter.persistence.entity.ChatEntity;
import au.com.chatter.persistence.entity.MessageEntity;

import java.time.LocalDateTime;

public record ChatSummaryDto(
    long id,
    String name,
    String preview,
    LocalDateTime lastMessageDate
) {

    public static ChatSummaryDto fromEntity(ChatEntity entity) {
        MessageEntity lastMessage = entity.getMessages().getLast();
        String lastMessagePreview = String.format(
            "%s: %s",
            lastMessage.getSender().getFirstName(),
            lastMessage.getContent()
        );

        return new ChatSummaryDto(
            entity.getId(),
            entity.getName(),
            lastMessagePreview,
            lastMessage.getSentAt()
        );
    }
}
