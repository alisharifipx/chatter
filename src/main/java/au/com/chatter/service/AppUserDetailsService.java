package au.com.chatter.service;

import au.com.chatter.controller.dto.NewAppUserRequestDto;
import au.com.chatter.domain.AppUserDetails;
import au.com.chatter.persistence.entity.AppUserEntity;
import au.com.chatter.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for handling app user business logic.
 */
@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
            .map(AppUserEntity::toDomain)
            .orElseThrow(() -> new UsernameNotFoundException(String.format("No user found with email '%s'.", email)));
    }

    public AppUserDetails addUser(NewAppUserRequestDto request) {
        String encodedPassword = passwordEncoder.encode(request.password());

        if (encodedPassword == null) {
            throw new IllegalStateException("PasswordEncoder failed to produce a hash");
        }

        AppUserEntity entity = AppUserEntity.builder()
            .email(request.email())
            .password(encodedPassword)
            .email(request.email())
            .build();

        AppUserEntity savedEntity = userRepository.save(entity);

        return savedEntity.toDomain();
    }
}
