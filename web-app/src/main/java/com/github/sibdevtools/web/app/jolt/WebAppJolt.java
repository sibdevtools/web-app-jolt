package com.github.sibdevtools.web.app.jolt;

import com.github.sibdevtools.localization.api.dto.LocalizationId;
import com.github.sibdevtools.localization.api.dto.LocalizationSourceId;
import com.github.sibdevtools.localization.mutable.api.source.LocalizationJsonSource;
import com.github.sibdevtools.webapp.api.dto.HealthStatus;
import com.github.sibdevtools.webapp.api.dto.WebApplication;
import jakarta.annotation.Nonnull;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * @author sibmaks
 * @since 0.0.1
 */
@Getter
@Component
@LocalizationJsonSource(
        systemCode = "WEB.APP.JOLT",
        path = "classpath:/web/app/jolt/content/localizations/eng.json",
        iso3Code = "eng"
)
@LocalizationJsonSource(
        systemCode = "WEB.APP.JOLT",
        path = "classpath:/web/app/jolt/content/localizations/rus.json",
        iso3Code = "rus"
)
public class WebAppJolt implements WebApplication {
    private static final LocalizationSourceId LOCALIZATION_SOURCE_ID = new LocalizationSourceId("WEB.APP.JOLT");

    @Value("${web.app.jolt.version}")
    private String version;

    @Nonnull
    @Override
    public String getCode() {
        return "web.app.jolt";
    }

    @Nonnull
    @Override
    public String getFrontendUrl() {
        return "/web/app/jolt/ui/";
    }

    @Nonnull
    @Override
    public LocalizationId getIconCode() {
        return new LocalizationId(LOCALIZATION_SOURCE_ID, "web.app.jolt.icon");
    }

    @Nonnull
    @Override
    public LocalizationId getTitleCode() {
        return new LocalizationId(LOCALIZATION_SOURCE_ID, "web.app.jolt.title");
    }

    @Nonnull
    @Override
    public LocalizationId getDescriptionCode() {
        return new LocalizationId(LOCALIZATION_SOURCE_ID, "web.app.jolt.description");
    }

    @Nonnull
    @Override
    public Set<String> getTags() {
        return Set.of(
                "validator",
                "jolt"
        );
    }

    @Nonnull
    @Override
    public HealthStatus getHealthStatus() {
        return HealthStatus.UP;
    }
}
