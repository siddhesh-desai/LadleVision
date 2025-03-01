import cv2
import cvzone
from ultralytics import YOLO
import math
from datetime import datetime

video = cv2.VideoCapture('../VideoPath')


def trackLadle(video, callback):
    # Output format

    # Add start time
    # ans = [ladlenumber, timestamp, location, temperature]

    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    n_frames = 2

    model = YOLO('../Models/yolov8n.pt')
    class_names = ['Ladle', 'Number']

    while True:
        success, img = video.read()

        results = model(img, stream=True)

        for r in results:
            boxes = r.boxes

            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                bbox = (x1, y1, x2 - x1, y2 - y1)
                w = x2 - x1

                conf = math.ceil(box.conf[0] * 100) / 100
                cls = int(box.cls[0])

                if conf >= 0.6 and cls == 0:
                    cvzone.cornerRect(img, bbox)
                    cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
                    callback([57, datetime.now().timestamp(), w // (width / 2), 55, "L"])
                if conf >= 0.4 and cls == 1:
                    cvzone.cornerRect(img, bbox)
                    cvzone.putTextRect(img, f'{class_names[cls]} {conf}', (max(0, x1), max(20, y1 - 20)))
                    callback([57, datetime.now().timestamp(), w // (width / 2), 55, "N"])



        cv2.imshow("Image", img)
        cv2.waitKey(1)
