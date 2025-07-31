
function seededRandom(seed) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return function () {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    h += h << 5;
    return (h >>> 0) / 4294967296;
  };
}

function generateSeededPassword(seed){
    const rand = seededRandom(seed);
    const length = 32;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const punctuation = "!@#$%&*()-_+=?";
    const all = upper + lower + digits + punctuation;

    let password = [
        upper[Math.floor(rand() * upper.length)],
        lower[Math.floor(rand() * lower.length)],
        digits[Math.floor(rand() * digits.length)],
        punctuation[Math.floor(rand() * punctuation.length)],
    ];

    for (let i = 0; i < length - 4; i++) {
        password.push(all[Math.floor(rand() * all.length)]);
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [password[i], password[j] = password[j], password[i]];
    }

    return password.join('');
}

function GeneratePassword() {
    const seed = document.getElementById("seedInput").value;
    const resultDiv = document.getElementById("passwordResult");

    if (!seed) {
        resultDiv.textContent = "Please enter a seed phrase.";
        return;
    }

    const password = generateSeededPassword(seed);
    resultDiv.textContent = password;
}

function CopyToClipboard() {
    const passwordDiv = document.getElementById("passwordResult");
    const password = passwordDiv.textContent;

    if (!password || password === "Your generated password will appear here..." || password === "Please enter a seed phrase." || password === "Copied to clipboard!") {
        return;
    }

    navigator.clipboard.writeText(password).then(()=>{
        passwordDiv.textContent = "Copied to clipboard!";

        setTimeout(() => {
            passwordDiv.textContent = password;
        }, 1500);
    }).catch(() => {
        alert("Failed to copy password to clipboard.")
    });
}