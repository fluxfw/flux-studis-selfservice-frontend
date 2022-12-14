#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path/posix";

let shutdown_handler = null;
try {
    shutdown_handler = await (await import("../../flux-shutdown-handler-api/src/Adapter/Api/ShutdownHandlerApi.mjs")).ShutdownHandlerApi.new()
        .getShutdownHandler();

    const json_api = (await import("../../flux-json-api/src/Adapter/Api/JsonApi.mjs")).JsonApi.new();

    const localization_api = (await import("../../flux-localization-api/src/Adapter/Api/LocalizationApi.mjs")).LocalizationApi.new(
        json_api
    );
    await localization_api.init();

    const pwa_generator_api = (await import("../../flux-pwa-generator-api/src/Adapter/Api/PwaGeneratorApi.mjs")).PwaGeneratorApi.new(
        json_api,
        localization_api
    );

    const __dirname = dirname(fileURLToPath(import.meta.url));

    const web_root = join(__dirname, "..", "src");
    const manifest_json_file = join(web_root, "Adapter", "Pwa", "manifest.json");

    await pwa_generator_api.generateManifestJsons(
        manifest_json_file,
        join(web_root, "Adapter", "Localization")
    );

    await pwa_generator_api.generateIndexHtmls(
        manifest_json_file,
        join(web_root, "index.html"),
        "Adapter/Pwa/manifest.json",
        "index.mjs"
    );
} catch (error) {
    console.error(error);

    if (shutdown_handler !== null) {
        await shutdown_handler.shutdown(
            1
        );
    } else {
        process.exit(1);
    }
}
