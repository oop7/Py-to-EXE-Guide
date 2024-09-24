# **How to Convert a Python Script to an Executable (.exe)**

This guide will show you how to convert a Python script into a standalone executable file using tools like `PyInstaller` and `auto-py-to-exe`.

## 1. **Set Up the Project Folder**

- Create a folder and name it whatever you like, for example, `envs`.

- Move or copy your Python script (`.py` file) into this folder.

## 2. **Open Visual Studio Code (VS Code)**

- Launch VS Code and open the folder that contains your script.

- Select your Python script file in the explorer pane.

- open the terminal

## 3. **Create a Virtual Environment**

To ensure that the required dependencies are isolated and consistent, create a virtual environment:

```bash
C:\Users\(your_username)\AppData\Local\Programs\Python\(python_version)\python.exe -m venv test
```
Here, `test` is the name of the virtual environment. You can replace it with any name you prefer.

## 4. **Activate the Virtual Environment**

To activate the virtual environment, run the following command:

- On Windows, in the terminal:

```bash
test\scripts\activate
```

- If you're facing issues with the command above, try:

```bash
test\scripts\activate.bat
```

## 5. **Install Required Packages**

After activating the virtual environment, you need to install the necessary dependencies:

1. Install the dependencies for your script:

```bash
pip install -r requirements.txt
```

(If you don't have a `requirements.txt` file, manually install each dependency using `pip install <package_name>`.

2. Install `pyinstaller`:

```
pip install pyinstaller
```
3. Install `auto-py-to-exe`:

```bash
pip install auto-py-to-exe
```

## 6. **Launch auto-py-to-exe**

Once installed, launch the tool by simply running the following command in the terminal:

```bash
auto-py-to-exe
```

## 7. **Configure the Conversion**

In the `auto-py-to-exe` GUI:

- Select **One File**.

- Choose **Window Based** to hide the console window (optional but useful for GUI applications).

## 8. **Optimize the Executable (Optional)**

You can use **UPX** to compress your executable and reduce its file size. To do this:

1. **Open the UPX folder:** Navigate to the folder where UPX is located.

2. **Open PowerShell with Shift+Right-click:** Hold `Shift`, then right-click inside the UPX folder and choose "Open PowerShell window here."

3. Run the following command:

```bash
.\upx --best "path_to_your_executable"
```
Replace `"path_to_your_executable"` with the actual path to your generated `.exe` file.

- If you face the error `GUARD_CF enabled PE files are not supported`, try the following:

```
.\upx --best -f "path_to_your_executable"
```
## ✅ 9. **Enjoy!**

Your Python script is now converted into an executable file! You can share this `.exe` with others, and it will run on their machines even if they don't have Python installed.

## ❓ **Additional Notes:**

- Ensure that the path to your Python installation and other tools like UPX is correct.

- The UPX compression is optional and mainly used to reduce the file size of the .exe file.

- You can include a shortcut to activate the virtual environment or use the -r flag to automate the installation of dependencies.

## 📜 **License:**

- This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ℹ️ **Acknowledgments:**

- Special thanks to CodersLegacy, which was instrumental in the functionality of this guide.

