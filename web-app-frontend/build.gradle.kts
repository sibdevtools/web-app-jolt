import com.github.gradle.node.npm.task.NpmTask

plugins {
  alias(libs.plugins.node)
}

node {
  version = libs.versions.node.get()
  npmVersion = libs.versions.npm.get()
  download.set(true)
}

tasks.register<NpmTask>("build") {
  group = "build"
  description = "Builds the React frontend using npm."
  dependsOn("npmInstall")
  args.set(listOf("run", "build"))
}
