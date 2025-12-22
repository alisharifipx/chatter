package au.com.chatter.persistence.repository;

import au.com.chatter.persistence.entity.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Database repository for Users.
 */
@Repository
public interface UserRepository extends JpaRepository<CustomUser, Long> {

    Optional<CustomUser> findByUsername(String username);
}
