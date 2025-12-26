package au.com.chatter.persistence.entity;

import au.com.chatter.domain.AppUserDetails;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Database entity for an app user.
 */
@Entity
@Table(name = "APP_USER")
public class AppUserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    @Column(unique = true)
    @Getter
    @Setter
    private String email;
    @Setter
    private boolean enabled;
    @Setter
    private boolean accountExpired;
    @Setter
    private boolean accountLocked;
    @Setter
    private boolean credentialsExpired;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return username;
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

    public AppUserDetails toDomain() {
        return new AppUserDetails(
            id,
            username,
            password,
            email,
            enabled,
            accountLocked,
            accountExpired,
            credentialsExpired
        );
    }
}
