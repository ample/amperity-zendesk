# Previewing a Zendesk Theme Locally

This documentation provides step-by-step instructions on how to preview a Zendesk theme locally before deploying it to your Zendesk instance. 

## Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed on your computer. You can download and install them from [Node.js official website](https://nodejs.org/).
2. **Zendesk CLI**: Install the Zendesk Command Line Interface (CLI).

## Installation

1. **Install Node.js and npm**:
   - Download and install from [Node.js official website](https://nodejs.org/).
   - Verify installation:
     ```sh
     node -v
     npm -v
     ```

2. **Install Zendesk CLI**:
   - Open your terminal or command prompt and run:
     ```sh
     npm install -g @zendesk/zcli
     ```

## Setting Up Your Zendesk Theme

1. **Download Your Theme**:
   - Go to your Zendesk Guide admin panel.
   - Navigate to **Customize Design**.
   - Click on **Edit Code**.
   - Download the current theme.

2. **Extract the Theme**:
   - Extract the downloaded theme ZIP file to a directory of your choice.

3. **Navigate to Theme Directory**:
   - Open your terminal or command prompt.
   - Change to the directory where you extracted the theme:
     ```sh
     cd path/to/your/theme
     ```

## Running Zendesk Theme Preview Locally

1. **Login to Zendesk CLI**:
   - Run the following command to log in to your Zendesk account:
     ```sh
     zcli login
     ```
   - Follow the prompts to authenticate.

2. **Serve the Theme Locally**:
   - After logging in, run the following command to serve the theme locally:
     ```sh
     zcli themes:preview
     ```
   - This command will start a local server and open a new browser window/tab with a preview of your Zendesk theme.

3. **Make Changes and Preview**:
   - You can now make changes to your theme files.
   - The local server will automatically reload the preview whenever you save your changes.

## Additional Commands

1. **Deploy the Theme**:
   - Once you are satisfied with your changes, you can deploy the theme to your Zendesk instance:
     ```sh
     zcli themes:deploy
     ```
   - Follow the prompts to select the theme and confirm the deployment.

2. **Logout from Zendesk CLI**:
   - If you need to log out from the Zendesk CLI, run:
     ```sh
     zcli logout
     ```

## Troubleshooting

- **Issues with Login**:
  - Ensure your internet connection is stable.
  - Verify your Zendesk credentials.
  - Clear any existing sessions using:
    ```sh
    zcli logout
    zcli login
    ```

- **Local Server Not Starting**:
  - Ensure you are in the correct theme directory.
  - Verify that all necessary files (like `manifest.json`) are present in the theme directory.

- **Changes Not Reflecting**:
  - Ensure you save the files after making changes.
  - Check the terminal for any errors or warnings.

## Conclusion

Previewing your Zendesk theme locally allows you to make and test changes efficiently before deploying them to your live Zendesk instance. By following the steps outlined in this documentation, you can set up your local environment, make changes, and ensure everything looks perfect before going live.

