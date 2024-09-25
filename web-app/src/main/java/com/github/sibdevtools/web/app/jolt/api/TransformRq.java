package com.github.sibdevtools.web.app.jolt.api;


import java.util.List;
import java.util.Map;

/**
 * @author sibmaks
 * @since 0.0.1
 */
public record TransformRq(List<Map<String, Object>> specification,
                          Object input) {
}
