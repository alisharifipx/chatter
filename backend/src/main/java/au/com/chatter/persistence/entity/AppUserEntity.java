package au.com.chatter.persistence.entity;

import au.com.chatter.domain.AppUserDetails;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

/**
 * Database entity for an app user.
 */
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "APP_USER")
public class AppUserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Nullable
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Getter
    private String firstName;

    @Getter
    private String lastName;

    @Builder.Default
    @Setter
    private boolean enabled = true;

    @Setter
    private boolean accountExpired;

    @Setter
    private boolean accountLocked;

    @Setter
    private boolean credentialsExpired;

    public AppUserDetails toDomain() {
        return new AppUserDetails(
            Objects.requireNonNull(id, "Entity must be persisted before converting to domain"),
            email,
            password,
            firstName,
            lastName,
            enabled,
            accountLocked,
            accountExpired,
            credentialsExpired
        );
    }

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
