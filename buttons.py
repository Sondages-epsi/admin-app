from gpiozero import Button
from time import sleep

button3 = Button(19)
button2 = Button(13)
button1 = Button(6)

while True:
    if button1.is_pressed:
        print("Pressed1")
        sleep(1)
    if button2.is_pressed:
        print("Pressed2")
        sleep(1)
    if button3.is_pressed:
        print("Pressed3")
        sleep(1)
    sleep(0.1)