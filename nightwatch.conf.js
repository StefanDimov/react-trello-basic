module.exports = {
    src_folders: 'e2e/tests',
    globals_path: 'e2e/globals/chromedriver-local.js',
    page_objects_path: 'e2e/page-objects',
    test_settings: {
        default: {
            launch_url: 'http://localhost',
            'selenium_port': 9515,
            'selenium_host': 'localhost',
            'default_path_prefix': '',
            'desiredCapabilities': {
                'browserName': 'chrome',
                'chromeOptions' : {
                    'args': ['--no-sandbox']
                },
                'acceptSslCerts': true
            }
        }
    }
}
