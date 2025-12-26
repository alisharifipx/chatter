package au.com.chatter.controller;

import au.com.chatter.controller.dto.AppUserDto;
import au.com.chatter.controller.dto.NewAppUserRequestDto;
import au.com.chatter.controller.dto.UserSessionDto;
import au.com.chatter.domain.AppUserDetails;
import au.com.chatter.service.AppUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * REST API controller for Users.
 */
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final AppUserDetailsService appUserDetailsService;

    @GetMapping("/session")
    public ResponseEntity<UserSessionDto> getSession(@AuthenticationPrincipal AppUserDetails user) {
        UserSessionDto response = new UserSessionDto(user.id(), user.username());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<AppUserDto> register(@RequestBody NewAppUserRequestDto newUser) {
        AppUserDetails userDetails = appUserDetailsService.addUser(newUser);

        return ResponseEntity.ok(AppUserDto.fromDomain(userDetails));
    }
}
