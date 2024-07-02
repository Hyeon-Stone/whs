const COPY_TEXT_CHANGE_OFFSET = 1000;
const COPY_BUTTON_TEXT_BEFORE = 'Copy';
const COPY_BUTTON_TEXT_AFTER = 'Copied';
const COPY_ERROR_MESSAGE = '코드를 복사할 수 없습니다. 다시 시도해 주세요.';

const codeBlocks = document.querySelectorAll('pre > code');

const copyBlockCode = async (target = null) => {
    if (!target) return;
    try {
        const code = decodeURI(target.dataset.code);
        if (window.isSecureContext && navigator.clipboard) {
            await navigator.clipboard.writeText(code);
        } else {
            unsecuredCopyToClipboard(code);
        }
        target.textContent = COPY_BUTTON_TEXT_AFTER;
        setTimeout(() => {
            target.textContent = COPY_BUTTON_TEXT_BEFORE;
        }, COPY_TEXT_CHANGE_OFFSET);
    } catch(error) {
        alert(COPY_ERROR_MESSAGE);
        console.error(error);
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

$(document).ready(function(){
    cnt = 0;
    for (const codeBlock of codeBlocks) {

        let codes = codeBlock.innerHTML.match(/(.*)(\n|.*$)/g)
            .filter((element, i) => {
                if (element !== '\n')
                    return element;
            });
        const processedCodes = codes.reduce((prevCodes, curCode) => prevCodes + `<div class="line">${curCode}</div>`, '');
        const copyButton = `<button type="button" class="copy-btn" 
        data-code="${encodeURI(codeBlock.textContent)}" 
        onclick="copyBlockCode(this)">${COPY_BUTTON_TEXT_BEFORE}</button>`;

        const codeBody = `<div class="code-body code-body${cnt}">${processedCodes}</div>`;

        codeBlock.innerHTML = codeBody + copyButton;
        cnt +=1
    }

})