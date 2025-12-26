package au.com.chatter.controller.dto;

import au.com.chatter.domain.AppUserDetails;

/**
 * DTO representing an app user.
 */
public record AppUserDto(
    Long id,
    String username,
    String email,
    boolean enabled,
    boolean accountExpired,
    boolean accountLocked,
    boolean credentialsExpired
) {

    public static AppUserDto fromDomain(AppUserDetails appUserDetails) {
        return new AppUserDto(
            appUserDetails.id(),
            appUserDetails.username(),
            appUserDetails.email(),
            appUserDetails.enabled(),
            appUserDetails.accountLocked(),
            appUserDetails.accountExpired(),
            appUserDetails.credentialsExpired()
        );
    }
}
