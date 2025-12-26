package au.com.chatter.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * DTO representing an app user.
 */
public record AppUserDto(
    Long id,
    String username,
    @JsonIgnore String password,
    String email,
    boolean enabled,
    boolean accountExpired,
    boolean accountLocked,
    boolean credentialsExpired
) {

}
