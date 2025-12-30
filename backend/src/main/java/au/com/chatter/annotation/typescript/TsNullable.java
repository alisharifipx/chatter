package au.com.chatter.annotation.typescript;

import java.lang.annotation.*;

/**
 * Marker annotation to generate nullable typescript-types.
 * <p>Example: {@code value: string | null}</p>
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE_USE, ElementType.TYPE_PARAMETER})
public @interface TsNullable {

}
