TRANSLATE
=========

The `ark-translate` component, provides an easy way to add translations in our app through a select input:

## INSTRUCTIONS

1. Create a folder in your app (named `/locale` by default) and add a folder for each language.
2. Add a `default.json` file, with the variables you are going to target, and the respective translations as its values.

**example:** 

```json
{
  "hello": "Hello",
  "world": "World",
  "magic": "Magic"
}
```

3. Instantiate the `ark-translate` component with `languages` attribute

```html
  <ark-translate languages="en,es,fr"></ark-translate>
```

4.Target the variables on any element you want to apply the translation, using the `data-i18n` attribute:

```html
  <span data-i18n="hello">Hello</span>
  <span data-i18n="world">World</span>
  <span>
    <strong data-i18n="magic">Magic</strong>
  </span>
```

Attributes
----------

|   Name    | Type  |                          Options                          |    Default     |                           Description                            |
| :-------: | :---: | :-------------------------------------------------------: | :------------: | :--------------------------------------------------------------: |
| languages | text  | en (English), es (Español), fr (Français), pt (Português) | 'es' (Español) |                Specifies the available languages                 |
| endpoint  | text  |                            any                            |   '/locales'   | Specifies a folder in which the translation data will be stored. |
| namespace | text  |                            any                            |    default     |         The name of the json file with the translations          |
|   root    | text  |                 any HTML wrapper element                  |     'body'     |   The parent element that wraps the elements to be translated    |

Properties
----------

|   Name    | Type  |                          Options                          |    Default     |                           Description                            |
| :-------: | :---: | :-------------------------------------------------------: | :------------: | :--------------------------------------------------------------: |
| languages | text  | en (English), es (Español), fr (Français), pt (Português) | 'es' (Español) |                Specifies the available languages                 |
| endpoint  | text  |                            any                            |   '/locales'   | Specifies a folder in which the translation data will be stored. |
| namespace | text  |                            any                            |   'default'    |         The name of the json file with the translations          |
|   root    | text  |                 any HTML wrapper element                  |     'body'     |   The parent element that wraps the elements to be translated    |

