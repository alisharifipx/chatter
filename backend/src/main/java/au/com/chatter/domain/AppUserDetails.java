package au.com.chatter.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Domain object for a user within the app.
 */
public record AppUserDetails(
    Long id,
    String email,
    @JsonIgnore String password,
    String firstName,
    String lastName,
    @JsonIgnore boolean enabled,
    @JsonIgnore boolean accountExpired,
    @JsonIgnore boolean accountLocked,
    @JsonIgnore boolean credentialsExpired
) implements UserDetails {

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !accountExpired;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !credentialsExpired;
    }
}
