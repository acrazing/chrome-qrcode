/** Created by acrazing on 2015/7/5. */
(function() {
    var setting = {
            width: 196,
            height: 196,
            colorDark: "#000",
            colorLight: "#FFF",
            correctLevel: QRCode.CorrectLevel.L
        },
        $qrcode = $("#qrcode"),
        qrcode = new QRCode("qrcode", setting),
        $input = $("#input-content"),
        makeQrcode = function(text, update) {
            if(typeof text !== "string") {
                update = text;
                text = null;
            }
            if(text === null) {
                text = $input.val();
            }
            if(update === true) {
                $qrcode.empty();
                qrcode = new QRCode("qrcode", setting);
            }
            qrcode.makeCode(text);
        },
        $settingLevel = $("#setting-level").find("input");
    $settingLevel.change(function() {
        setting.correctLevel = parseInt($settingLevel.filter(":checked").val());
        makeQrcode(true);
    });
    $input.on("keydown", function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
        }
    }).on("keyup", function(e) {
        if(e.keyCode === 13 || (e.keyCode === 86 && e.ctrlKey === true)) {
            makeQrcode();
        }
    });
    chrome.tabs.getSelected(null, function(tab) {
        $input.val(tab.url);
        makeQrcode();
    });
})();