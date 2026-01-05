package au.com.chatter.controller.dto;

import au.com.chatter.persistence.entity.MessageEntity;

import java.time.LocalDateTime;

public record MessageDto(long id, ChatParticipantDto sender, String content, LocalDateTime sentAt) {

    public static MessageDto fromEntity(MessageEntity entity) {
        return new MessageDto(
            entity.getId(),
            ChatParticipantDto.fromEntity(entity.getSender()),
            entity.getContent(),
            entity.getSentAt()
        );
    }
}
