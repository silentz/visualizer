# Visualizer

This application is made to provide an easy way to introduce and visualize graph algorithms.
It has modular structure and is easy to extend with new algorithms. The application was created during
[&laquo;Higher school of economics&raquo;](https://www.hse.ru/ba/ami) project course. Here is a main
view screenshot:

![view](/readme_data/view.png)

## Features

- Current code line highlight.
- Сomments for each line of code.
- Animation of each code line in view panel.
- Step forward/backward or choose current step using controls.
- Visualization step speed control.
- Built-in examples and ability to create your own.
- Select programming language.

## Run

The easiest way to launch the application is to use docker. To launch project just type
folowing line in your terminal application:

``` bash
docker-compose up --build
```

This will launch the application at http://localhost:8080.
To terminate the process just press `Ctrl+d` combination in terminal application.
