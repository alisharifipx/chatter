package au.com.chatter.controller.dto;

import org.jspecify.annotations.NullMarked;

@NullMarked
public record NewAppUserRequestDto(
    String username,
    String password,
    String email
) {

}
