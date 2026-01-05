package au.com.chatter.controller.dto;

import au.com.chatter.domain.AppUserDetails;

/**
 * DTO representing an app user.
 */
public record AppUserDto(
    long id,
    String email,
    String firstName,
    String lastName,
    boolean enabled,
    boolean accountExpired,
    boolean accountLocked,
    boolean credentialsExpired
) {

    public static AppUserDto fromDomain(AppUserDetails appUserDetails) {
        return new AppUserDto(
            appUserDetails.id(),
            appUserDetails.email(),
            appUserDetails.firstName(),
            appUserDetails.lastName(),
            appUserDetails.enabled(),
            appUserDetails.accountLocked(),
            appUserDetails.accountExpired(),
            appUserDetails.credentialsExpired()
        );
    }
}
