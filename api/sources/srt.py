import srt

def extract_srt(srt_file: str) -> [str]:
    result = []

    with open(srt_file, 'r') as file:
        subtitle_content = file.read()

        for line in srt.parse(subtitle_content):
            content = line.content.replace('\n', '')
            result.append(content)

    return result
