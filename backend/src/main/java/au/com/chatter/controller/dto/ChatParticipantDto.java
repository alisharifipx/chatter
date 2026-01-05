package au.com.chatter.controller.dto;

import au.com.chatter.persistence.entity.AppUserEntity;

public record ChatParticipantDto(long id, String firstName, String lastName) {

    public static ChatParticipantDto fromEntity(AppUserEntity entity) {
        return new ChatParticipantDto(
            entity.getId(),
            entity.getFirstName(),
            entity.getLastName()
        );
    }
}
