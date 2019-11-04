import { ReplaySubject } from 'rxjs';
import { CAPTCHA_SITE_KEY_V3, CAPTCHA_SITE_KEY_V2 } from './constants';

declare var window: any;
export const clearHTML = (text: string) => text.replace(/\/>/g, "").replace(/<\//g, "").replace(/[<>]/g, "").replace(/%/g, "").replace(/\//g, "");
export const clearMessageHTML = (text: string) => text.replace(/\/>/g, "").replace(/<\//g, "").replace(/[<>]/g, "");

export const $gCaptchaResponseSubject = new ReplaySubject(null);
export const $gCaptchaResponseObs = $gCaptchaResponseSubject.asObservable();
export function captchaVerifyCallback(cresponse: any) {
    // console.log('captchaVerifyCallback fired ', window['grecaptcha'].getResponse());
    $gCaptchaResponseSubject.next(cresponse);
}

window['captchaSiteKey'] = null;
window['onLoadCaptchaExplicitCallback'] = onLoadCaptchaExplicitHandler;
export function onLoadCaptchaExplicitHandler() {
    // console.log('onLoadCaptchaExplicitCallback callback fired');

    if (!window['grecaptcha']) {
        console.error('Not found grecaptcha object or g-recaptcha element not found ');
        return;
    }

    if (document.getElementById('gRecaptchaElement')) {
        window.grecaptcha.render('gRecaptchaElement', {
            sitekey: window['captchaSiteKey'],
            callback: captchaVerifyCallback,
        });
    }

    if (document.getElementById('captchaDesktop')) {
        window.grecaptcha.render('captchaDesktop', {
            sitekey: window['captchaSiteKey'],
            callback: captchaVerifyCallback,
        });
    }
};

export function reCaptchaInitialize(version: string) {
    // console.log('reCaptchaInitialize invoked!', version);
    const ver = version.toLowerCase();
    let renderScript: any;
    let siteKey: any = ver === 'v3' ? CAPTCHA_SITE_KEY_V3 : CAPTCHA_SITE_KEY_V2;

    renderScript = ver === 'v3' ?
        "https://www.google.com/recaptcha/api.js?render=" + siteKey : "https://www.google.com/recaptcha/api.js?onload=onLoadCaptchaExplicitCallback&render=explicit";

    const dynamicScripts = [
        renderScript
    ];

    if (document.querySelector('[id*="gCaptchaDynamicScript_"]')) return;

    for (let i = 0; i < dynamicScripts.length; i++) {
        const node = document.createElement("script");
        node.id = 'gCaptchaDynamicScript_' + i;
        node.src = dynamicScripts[i];
        node.type = "text/javascript";
        node.async = true;
        node.defer = true;
        node.charset = "utf-8";
        node.onload = () => {
            $gCaptchaResponseSubject.next(null);
            if (!window['captchaSiteKey']) window['captchaSiteKey'] = siteKey;
        }

        document.getElementsByTagName("head")[0].appendChild(node);
    }

}
