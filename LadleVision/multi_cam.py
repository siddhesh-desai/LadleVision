# For Multiple cameras
from datetime import datetime

from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np
import easyocr
import time

from LadleVision.database_functions import insert_into_table, update_ladle_location, updateCircularTime

print("hello")
cap = cv2.VideoCapture(0)
address = "http://100.66.83.49:8080/video"
cap.open(address)

print("hello")
cap2 = cv2.VideoCapture(0)
address2 = "http://192.168.68.29:8080/video"
cap2.open(address2)

print("hello")
cap3 = cv2.VideoCapture(0)
address3 = "http://192.168.68.227:8080/video"
cap3.open(address3)

print("hello")
class_names = ['Number', 'Ladle', 'Ladle', 'Number', 'Ladle', 'Number']

model = YOLO('Models/final_model.pt')
reader = easyocr.Reader(['en'])

width = 1440
height = 270
num_frames = 9

while True:
    # time.sleep(0.25)
    success1, img1 = cap.read()
    success2, img2 = cap2.read()
    success3, img3 = cap3.read()

    # f2 = cv2.resize(img2, (480, 270))
    f2 = cv2.resize(img2, (480, 270))
    f1 = cv2.resize(img1, (480, 270))
    f3 = cv2.resize(img3, (480, 270))
    # f1 = cv2.resize(img1, (480*4, 270*4))
    # f3 = cv2.resize(img3, (480*4, 270*4))
    img = np.hstack((f1, f2, f3))
    img_og = np.hstack((f1, f2, f3))

    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes

        for box in boxes:
            num_detected = []
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            bbox = (x1, y1, x2 - x1, y2 - y1)
            w = x2 - x1

            conf = math.ceil(box.conf[0] * 100) / 100
            cls = int(box.cls[0])

            if cls == 1 or cls == 2 or cls == 4:
                cvzone.cornerRect(img, bbox)
                # cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
                # print([57, datetime.now().timestamp(), w // (width / 2), 55, "L"])
            elif cls == 0 or cls == 3 or cls == 5:
                cropped = img_og[y1:y2, x1:x2]
                num_detected += reader.readtext(cropped, detail=0)
                cvzone.cornerRect(img, bbox)
                # cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
                if num_detected and num_detected[0] in ['2', '3', '5', '6', '8']:
                    location = int(x1 // (width / num_frames))+1
                    number_detected = int(num_detected[0])
                    print([number_detected, location, 55])
                    # print([int(num_detected[0]), datetime.now().timestamp(), int(x1 // (width / num_frames)), 55, "N"])
                    insert_into_table(number_detected, 32, location)
                    update_ladle_location(number_detected, location)

                    if location in (1, 9):
                        updateCircularTime(number_detected, location)


    cv2.imshow("Image", img)
    cv2.waitKey(1)
