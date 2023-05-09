import cv2
import numpy as np
import pyautogui
import pytesseract
import time
import pyaudio
import wave
import os
import random
import sys

# arg1 = sys.argv[1]
arg1 = '9'

roundStart = False
deathHappened = False


def health_bar(screenshot):
    healthbar_region = (575, 1000, 650, 1050)
    cropped_image = screenshot.crop(healthbar_region)

    # Convert the screenshot to OpenCV format
    healthbar = np.array(cropped_image)

    # Convert the health bar to grayscale and apply thresholding
    healthbar_gray = cv2.cvtColor(healthbar, cv2.COLOR_BGR2GRAY)
    _, healthbar_thresh = cv2.threshold(
        healthbar_gray, 200, 255, cv2.THRESH_BINARY)

    # Save the screenshot as a PNG image
    # cv2.imwrite(f'screenshot{count}.png', healthbar_gray)

    # Apply OCR to the health bar
    health_percentage = pytesseract.image_to_string(
        healthbar_thresh, config='--psm 7')

    try:
        int_health_percentage = int(health_percentage)

        if (int_health_percentage < 80):
            print("Health percentage is low")
        elif (int_health_percentage == 100):
            print("Health is OKAy!")
        else:
            print("You are Dead")
    except:
        print("health_percentage is not a number")


def screenshotToString(round_indicator_region):
    # round_indicator_region = (835, 155, 1090, 238)
    screenshot = pyautogui.screenshot()
    indicator_cropped_image = screenshot.crop(round_indicator_region)
    round_indicator_region_cv = np.array(indicator_cropped_image)
    indicator_cropped_image_gray = cv2.cvtColor(
        round_indicator_region_cv, cv2.COLOR_BGR2GRAY)
    _, round_indicator_region_thresh = cv2.threshold(
        indicator_cropped_image_gray, 200, 255, cv2.THRESH_BINARY)
    round_indicator_region_string = pytesseract.image_to_string(
        round_indicator_region_thresh, config='--psm 7')
    lower_case = round_indicator_region_string.strip().lower()
    return lower_case


def checkEvent(response):
    global roundStart
    global deathHappened
    if ((response == "buy phase" or response == "iatch poin") and roundStart == False):
        print("Buying!")
        playAudio(os.path.abspath("python\\data\\voices\\buy phase"))
        roundStart = True
        deathHappened = False
        return
    elif ((response == "lost" or response == "lust") and roundStart == True):
        print("You Lost!")
        playAudio(os.path.abspath("python\\data\\voices\\lost"))
        roundStart = False
        return
    elif ((response == "clitph" or response == "clutch") and roundStart == True):
        print("You Clutched!!")
        playAudio(os.path.abspath("python\\data\\voices\\won"))
        roundStart = False
        return
    else:
        response = screenshotToString((890, 160, 1030, 238))
        print(response)
        if ((response == "won" or response == "wun") and roundStart == True):
            print("You Won!")
            playAudio(os.path.abspath("python\\data\\voices\\won"))
            roundStart = False
            return
        elif (screenshotToString((165, 855, 276, 870)) == "switch player" and roundStart == True and deathHappened == False):
            print("Death!")
            playAudio(os.path.abspath("python\\data\\voices\\death"))
            deathHappened = True
            return
        elif (screenshotToString((650, 160, 1275, 238)) == "last round before swap" and roundStart == False):
            print("last round before swap")
            playAudio(os.path.abspath("python\\data\\voices\\buy phase"))
            roundStart = True
            deathHappened = False
            return


def playAudio(path):
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 24000

    global arg1

    files = [os.path.join(path, f)
             for f in os.listdir(path) if f.endswith('.wav')]
    file = random.choice(files)

    wf = wave.open(file, 'rb')
    # sample_rate = wf.getframerate()

    p = pyaudio.PyAudio()

    # Open an output stream to the VB-Cable input device
    output_stream = p.open(format=FORMAT, channels=CHANNELS,
                           rate=RATE, output=True, output_device_index=int(arg1))

    # Read data from the audio file and write it to the output stream
    data = wf.readframes(CHUNK)
    while data != b'':
        output_stream.write(data)
        data = wf.readframes(CHUNK)

    # Stop the output stream and close the PyAudio instance
    output_stream.stop_stream()
    output_stream.close()
    p.terminate()


if __name__ == '__main__':
    while True:
        print("Running...")
        response = screenshotToString((835, 160, 1090, 238))
        print("main => ", response)
        checkEvent(response)
        time.sleep(1)
        sys.stdout.flush()
