package au.com.chatter.persistence.repository;

import au.com.chatter.persistence.entity.AppUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Database repository for Users.
 */
@Repository
public interface UserRepository extends JpaRepository<AppUserEntity, Long> {

    Optional<AppUserEntity> findByEmail(String email);

    @Query(
        value = "SELECT * FROM APP_USER u WHERE (u.first_name || ' ' || u.last_name) ILIKE %:query% AND u.id != :currentUserId",
        nativeQuery = true
    )
    List<AppUserEntity> searchUsers(@Param("query") String query, @Param("currentUserId") long currentUserId);
}
