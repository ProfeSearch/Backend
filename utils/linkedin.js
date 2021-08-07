const fs = require('fs');
const scrapedin = require('scrapedin');

const create = async (email, password) => {
    const options = {
        email,
        password,
    };
    const profileScraper = await scrapedin(options);
    const profile = await profileScraper(
        'https://www.linkedin.com/in/yibo-wen-0006071a4/',
        50000
    );
    //https://www.linkedin.com/in/yibo-wen-0006071a4/
    console.log('Printing....');
    fs.writeFileSync(
        `${__dirname}/${email}.txt`,
        JSON.stringify(profile, null, 2),
        'utf-8'
    );
    process.exit();
};

//run the script below to create
if (process.argv[2] === '--create') {
    const email = process.argv[3];
    const password = process.argv[4];
    create(email, password);
}
