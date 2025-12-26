package au.com.chatter.annotation.typescript;

import java.lang.annotation.*;

/**
 * Marker annotation to generate optional TypeScript-types.
 * <p>Example: {@code value?: string}</p>
 */
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE_USE, ElementType.TYPE_PARAMETER})
public @interface TsOptional {

}
