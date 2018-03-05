import os
from setuptools import find_packages, setup

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as readme:
    README = readme.read()

# allow setup.py to be run from any path
os.chdir(os.path.normpath(os.path.join(os.path.abspath(__file__), os.pardir)))

setup(
    name='django-mdeditor',
    version='0.1.1',
    packages=find_packages(exclude=['mdeditor_demo', 'mdeditor_demo_app.*', 'mdeditor_demo_app']),
    include_package_data=True,
    license='GPL-3.0 License',
    description='A simple Django app to edit markdown text.',
    long_description=README,
    url='',
    author='pylixm',
    author_email='pyli.xm@gmail.com',
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Framework :: Django :: 1.7',
        'Framework :: Django :: 1.8',
        'Framework :: Django :: 1.9',
        'Framework :: Django :: 1.10',
        'Framework :: Django :: 1.11',
        'Intended Audience :: Developers',
        'License :: GPL-3.0 License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        # Replace these appropriately if you are stuck on Python 2.
        'Programming Language :: Python :: 2.x',
        'Programming Language :: Python :: 3.x',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
    ],
)
