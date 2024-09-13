package com.github.simplemocks.web.app.jolt.conf;

import com.github.simple_mocks.localization_service.mutable.api.source.LocalizationJsonSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.VersionResourceResolver;

/**
 * @author sibmaks
 * @since 0.0.1
 */
@Configuration
@EnableWebMvc
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
public class JoltWebConf implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/web/app/jolt/**")
                .addResourceLocations("classpath:/web/app/jolt/static/")
                .resourceChain(true)
                .addResolver(new VersionResourceResolver().addContentVersionStrategy("/**"));
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/web/app/jolt/")
                .setViewName("forward:/web/app/jolt/index.html");
    }
}
