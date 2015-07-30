        transform = function (reasonFromServerWithError) {
            var text;
            if (reasonFromServerWithError === "dont_have_params") {
                text = 'ERROR: some query parameters are missing or it is empty';
            }
            if (reasonFromServerWithError === "have_such_identity") {
                text = 'ERROR: user with such data is already registered';
            }
            if (reasonFromServerWithError === "failed_to_create") {
                text = 'ERROR: user with such data is already registered';
            }
            if (reasonFromServerWithError === "wrong_pair") {
                text = 'ERROR: incorrectly specified mail and/or password';
            }
            return text;
        };
