export class Constants {
        // API
        public static readonly apiV2HeaderName: string = "x-api-version";  // header name lands across the wire in all lowercase
        public static readonly apiV2HeaderValue: string = "v2";

        // animations
        public static readonly matrixCharacters: string = 'アァカサタナハォコソトノホモヨョロヲゴッンABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890101010101010101010101010101010101';
        public static readonly decryptionEffectSpeedMillisSlow: number = 100;
        public static readonly decryptionEffectSpeedMillisModerate: number = 50;
        public static readonly decryptionEffectSpeedMillisFast: number = 25;
        public static readonly decryptionEffectSpeedMillisFaster: number = 12;
        public static readonly decryptionEffectSpeedMillisFastest: number = 6;
}
