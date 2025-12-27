package au.com.chatter.controller.dto;

import org.jspecify.annotations.NullMarked;

@NullMarked
public record NewAppUserRequestDto(
    String email,
    String password,
    String firstName,
    String lastName
) {

}
