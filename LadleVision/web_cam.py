# For Prototype Ladle Detection through Webcam

from ultralytics import YOLO
import cv2
import cvzone
import math
import numpy as np

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

class_names = ['Ladle', 'Number']
model = YOLO('Models/final_model.pt')

while True:
    success, img = cap.read()
    results = model(img, stream=True)

    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            bbox = (x1, y1, x2 - x1, y2 - y1)

            conf = math.ceil(box.conf[0] * 100) / 100
            cls = int(box.cls[0])

            cvzone.cornerRect(img, bbox)
            # cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
            # if conf>=0.4 and cls==1:
            #     cvzone.cornerRect(img, bbox)
            #     cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))

    cv2.imshow("Image", img)
    cv2.waitKey(1)
