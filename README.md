# Whisper

## Description
Whisper is a chatroom app. It allows users to create an account, and once logged in, a user can interact with other users in an online environment. It allows for posting, deleting, and editing of posts. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployed Application](#deployed-application)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Clone the repository, install the dependencies by navigating to the root directory and typing `npm i`. Afterwards, run `npm run build`, then `npm run develop`. You should get a popup of the application running locally. Use as normal.

### Expanding Languages
To expand languages, you can use any of the files within the `client/public/locales` as a reference. The files are named after their 2-letter international code ("en" for English, "de" for German [Deutsch], "fr" for French [Français], and "es" for Spanish [Español]).

The translation files are broken up into components to make it easier to navigate.

For translations, our team used DeepL (https://deepl.com). As long as all the text maintains the same structure, adding additional languages should not become too much of a challenge.

The last step to adding languages requires adding the settings file located in `client/src/config/settings.js` under `locale/list`. In this same section, it's possible to change the default language as well.

One last thing to note is that each locale translation file should be updated for each language added, since the names of the languages will also need to be translated.

### Expanding Themes

To expand the visual themes on the page, they must be added in three places:
1. `client/src/assets/styles/themes.scss`: Any modifications, or additions to this file should follow the same structure as the same themes located within this same file.
2. `client/src/config/settings.js`: Under `themes/list`, are several existing themes already. Any additional themes will need to be added to this list.
3. `client/public/locales`: In each language file, under `themes`, you'll want to add the corresponding key (the same one that was placed in settings), and the translated name for the theme.
 
The key links a reference to each language in the `client/public/locales` directory, under the `themes` section. The value represents the theme name, and the icon reference (a list of which can be found on https://fonts.google.com/icons).

### Settings
The settings file, `client/src/config/settings.js`, has already been mentioned several times. This file (on the client side) is meant to keep modifications easy. At the moment, there aren't a lot of options in there, but in future versions, this file will be crucial in keeping things flexible.

## Usage
Create an account, and chat online with other people! 

## Screenshots

## Deployed Application

## License
This project is licensed under the MIT license.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]

For more information about the license, click [here](https://opensource.org/licenses/MIT).

## Contributing
Please see the [Github Documents](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) regarding this topic.

## Tests
No tests written at this time.

## Questions
If you have any questions, feel free to reach out to us:
- Email: Joshuahale829@gmail.com, dannyproa303@gmail.com, Ray@RayBeliveau.com
- GitHub: [Sulxy](https://github.com/Sulxy), [DannySanchez03](https://github.com/DannySanchez03), [Rayxis](https://github.com/rayxis). 

## Credit
SVG Flags, and modified related SASS: https://github.com/lipis/flag-icons
