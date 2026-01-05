package au.com.chatter.controller.dto;

import au.com.chatter.persistence.entity.AppUserEntity;

public record UserSearchResultDto(long id, String firstName, String lastName) {

    public static UserSearchResultDto fromEntity(AppUserEntity entity) {
        return new UserSearchResultDto(entity.getId(), entity.getFirstName(), entity.getLastName());
    }
}
