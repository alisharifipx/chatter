package au.com.chatter.service;

import au.com.chatter.persistence.entity.AppUserEntity;
import au.com.chatter.persistence.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service for handling app user business logic.
 */
@Service
@AllArgsConstructor
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
            .map(AppUserEntity::toDomain)
            .orElseThrow(() -> new UsernameNotFoundException(String.format(
                "No user found with username '%s'.",
                username
            )));
    }
}
