const fs = require('fs');
const scrapedin = require('./scrapedin');

module.exports = async (email, password, url) => {
    const options = {
        email,
        password,
        hasToLog: true,
    };
    const profileScraper = await scrapedin(options);
    const profile = await profileScraper(url, 30000);
    //https://www.linkedin.com/in/yibo-wen-0006071a4/
    console.log('Wrapping Up...');
    const { name } = profile.profile;
    fs.writeFileSync(
        `${__dirname}/${name}.txt`,
        JSON.stringify(profile, null, 2),
        'utf-8'
    );
    return profile;
};
