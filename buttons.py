from gpiozero import Button
from time import sleep
import pyautogui

button3 = Button(19)
button2 = Button(13)
button1 = Button(6)

while True:
    if button1.is_pressed:
	pyautogui.press('1')
        sleep(0.6)
    if button2.is_pressed:
	pyautogui.press('2')
        sleep(0.6)
    if button3.is_pressed:
	pyautogui.press('3')
        sleep(0.6)
    sleep(0.1)