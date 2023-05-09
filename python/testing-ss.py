import pyaudio
import sys
import json

data = []

def print_audio_input_devices():
    global data
    p = pyaudio.PyAudio()
    info = p.get_host_api_info_by_index(0)
    num_devices = info.get('deviceCount')
    for i in range(num_devices):
        device_info = p.get_device_info_by_host_api_device_index(0, i)
        if device_info.get('maxOutputChannels') > 0 or device_info.get('maxInputChannels') > 0:
            json_obj = {"id": device_info.get('index'), "deviceName": device_info.get('name')}
            data.append(json_obj)
            


if __name__ == '__main__':
    print_audio_input_devices()
    json_data = json.dumps(data)
    sys.stdout.write(json_data)
    sys.stdout.flush()
