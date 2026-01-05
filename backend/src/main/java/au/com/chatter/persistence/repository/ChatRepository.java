package au.com.chatter.persistence.repository;

import au.com.chatter.persistence.entity.ChatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Database repository for chats/conversations.
 */
@Repository
public interface ChatRepository extends JpaRepository<ChatEntity, Long> {

    Optional<ChatEntity> findById(Long id);

    @Query("""
            SELECT DISTINCT c FROM ChatEntity c
            LEFT JOIN FETCH c.participants
            JOIN c.participants p
            WHERE p.id = :userId
            ORDER BY c.createdAt DESC
        """)
    List<ChatEntity> findAllChatsByUserId(@Param("userId") Long userId);
}
